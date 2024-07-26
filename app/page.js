import {auth} from '@/auth'

export default async function Page() {
  const session = await auth()
  const user = session?.user?.email
  console.log(session)

  return (
    <section>
      <h1>Home</h1>
    </section>
  )
}
