// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ipAddressAPI = createApi({
  reducerPath: "ipAddressAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `https://geo.ipify.org/api/v2` }),
  endpoints: (builder) => ({
    trackIP: builder.query({
      query: (inputTerm) => ({
        url: `/country,city?apiKey=${process.env.REACT_APP_API_KEY}`,
        params: { ipAddress: inputTerm },
        method: "GET",
      }),
    }),
  }),
});

export const { useTrackIPQuery } = ipAddressAPI;

// ({
//         url: `/country,city?apiKey=${process.env.REACT_APP_API_KEY}`,
//         params: { ipAddress: inputTerm },
//         method: "GET",
//       })
