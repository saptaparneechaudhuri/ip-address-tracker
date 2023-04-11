// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ipAddressAPI = createApi({
  reducerPath: "ipAddressAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `https://geo.ipify.org/api/v2` }),
  endpoints: (builder) => ({
    trackIP: builder.query({
      query: (inputTerm) => {
        const checkIP =
          /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

        const checkDomain =
          /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/gm;

        return {
          url: `/country,city?apiKey=${process.env.REACT_APP_API_KEY}`,
          params: checkIP.test(inputTerm)
            ? { ipAddress: inputTerm }
            : checkDomain.test(inputTerm)
            ? { domain: inputTerm }
            : "",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useTrackIPQuery } = ipAddressAPI;

// ({
//         url: `/country,city?apiKey=${process.env.REACT_APP_API_KEY}`,
//         params: { ipAddress: inputTerm },
//         method: "GET",
//       })
