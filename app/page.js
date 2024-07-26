import {auth, signIn, signOut} from '@/auth'

export default async function Page() {
  let session = await auth()
  let user = session?.user?.email
  console.log(session)

  return (
    <section>
      <h1>Home</h1>
    </section>
  )
}
