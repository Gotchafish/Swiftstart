import { client } from './supabase-client.js';
export const auth = { user:null, draftId:null, error:'', ready:false };
const LOCAL='swiftstart_demo_v1';
export async function startAuth(onChange, onDraft){
  const {data:{session},error}=await client.auth.getSession();
  if(error)auth.error=error.message;
  auth.user=session?.user||null;auth.ready=true;
  if(auth.user)await loadDraft(onDraft);
  onChange();
  client.auth.onAuthStateChange((_event,session)=>{
    const prev=auth.user?.id;
    auth.user=session?.user||null;
    if(auth.user?.id!==prev){
      auth.draftId=null;
      if(auth.user) setTimeout(()=>loadDraft(onDraft).then(onChange).catch(e=>{auth.error=e.message;onChange()}),0);
      else onChange();
    }
  });
}
export async function emailSignIn(email){
  return client.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+location.pathname}});
}
export async function signOut(){await client.auth.signOut()}
export async function loadDraft(onDraft){
  if(!auth.user)return;
  const {data,error}=await client.from('launch_applications').select('id,onboarding').eq('user_id',auth.user.id).eq('status','draft').order('updated_at',{ascending:false}).limit(1).maybeSingle();
  if(error)throw error;
  if(data){auth.draftId=data.id;onDraft(data.onboarding)}
}
export async function saveDraft(draft){
  if(!auth.user)throw new Error('Sign in before saving');
  const payload={user_id:auth.user.id,business_name:draft.name||'',structure:draft.structure||'company',category:draft.category||'retail',onboarding:{...draft,submitted:!!draft.submitted},updated_at:new Date().toISOString()};
  let query;
  if(auth.draftId)query=client.from('launch_applications').update(payload).eq('id',auth.draftId).eq('user_id',auth.user.id).eq('status','draft').select('id').single();
  else query=client.from('launch_applications').insert(payload).select('id').single();
  const {data,error}=await query;if(error)throw error;
  auth.draftId=data.id;
  localStorage.removeItem(LOCAL);
  auth.error='';
  return data.id;
}
