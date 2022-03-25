// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const githubUsername = localStorage.getItem("screenName");

// export const MostViewed = () => {
//   const [topRepoStats, setTopRepoStats] = useState({
//     name: "",
//     count: 0,
//     uniques: 0,
//   });

//   useEffect(() => {
//     const findMostViewed = async () => {
//       let allOwnedRepos;
//       try {
//         const { data } = await axios.get(
//           `https://api.github.com/search/repositories?q=user:${githubUsername}&per_page=100`
//         );
//         allOwnedRepos = data.items;
//       } catch (error) {
//         console.log(error);
//       };
//       allOwnedRepos.map(async (repo) => {
//         try {
//           const { data } = await axios.get(
//             `https://api.github.com/repos/${githubUsername}/${repo.name}/traffic/views`
//           );
//           if (data.count > topRepoStats.count) {
//               setTopRepoStats({
//                   name: repo.name,
//                   count: data.count,
//                   uniques: data.uniques,
//               });
//           };
//         } catch (error) {
//           console.log(error);
//         };
//       });
//     };
//     findMostViewed();
//   }, [topRepoStats]);

//   return (
//     <div>
//       Among repos you created, your most viewed repo is {topRepoStats.name} with{" "}
//       {topRepoStats.count} total views and {topRepoStats.uniques} uniques.
//     </div>
//   );
// };
