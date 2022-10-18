import { useGetTicketsQuery } from '../../app/services/tickets'

export default function Home() {
  const { data, isLoading } = useGetTicketsQuery()

  console.log(data)

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section>
      <h1>Tickets</h1>
      {JSON.stringify(data, null, 2)}
    </section>
  )

  return content
}
