import { api } from './api'

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => 'tickets',
      providesTags: ['Tickets'],
    }),
    getTicket: builder.query({
      query: (id) => `tickets/${id}`,
      providesTags: ['Tickets'],
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
      invalidatesTags: ['Tickets'],
    }),
  }),
})

export const {
  useGetTicketsQuery,
  useGetTicketQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
} = postsApi
