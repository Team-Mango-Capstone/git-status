import React from "react";
import { useQuery, gql } from "@apollo/client";

const screenName = localStorage.getItem("screenName");

const CONTRIBUTIONS_QUERY = gql`
query($userName:String!) { 
    user(login: $userName){
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
}
`;

export default function GraphQL() {
  const { data, loading, error } = useQuery(CONTRIBUTIONS_QUERY, {
      variables: { "userName": screenName},
  });

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  console.log('THEE DATA >>>>>', data)

  return (
    <div>
        Here is our component....
    </div>
  );
}