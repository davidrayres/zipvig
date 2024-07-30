'use client'
import FadeLoader from 'react-spinners/FadeLoader'

const override = {
  display: 'block',
  margin: '100px auto',
}

export default function LoadingPage({loading}) {
  return <FadeLoader color='#ff8200' loading={loading} cssOverride={override} size={150} aria-label='Loading Spinner' />
}
