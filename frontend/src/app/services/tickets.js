import { api } from './api'

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => 'tickets',
      providesTags: (result) => [
        ...result.map(({ id }) => ({ type: 'Tickets', id })),
      ],
    }),
    getTicket: builder.query({
      query: (id) => `tickets/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tickets', id }],
    }),
    createTicket: builder.mutation({
      query: (body) => ({
        url: 'tickets',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tickets'],
    }),
    updateTicket: builder.mutation({
      query(data) {
        const { id, status } = data
        return {
          url: `tickets/${id}`,
          method: 'PUT',
          body: { status },
        }
      },
      invalidatesTags: (ticket) => [{ type: 'Tickets', id: ticket?.id }],
    }),
  }),
})

export const {
  useGetTicketsQuery,
  useGetTicketQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
} = postsApi
