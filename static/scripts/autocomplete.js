// const autoCompleteJS = new autoComplete({
//     data: {
//       src: async () => {
//         try {
//           // Loading placeholder text
//           document.getElementById("autoComplete");
//           const source = await fetch(
//             "https://saravanamani1999.github.io/api/moduleInfo.json"
//           );
//           const data = await source.json();
//           document.getElementById("autoComplete");
//           return data;
//         } catch (error) {
//           return error;
//         }
//       },
//       keys: ["moduleCode"],
//       cache: true,
//       filter: (list) => {
//         const filteredResults = Array.from(
//           new Set(list.map((value) => value.match))
//         ).map((moduleCode) => {
//           return list.find((value) => value.match === moduleCode);
//         });

//         return filteredResults;
//       }
//     },
//     resultsList: {
//       element: (list, data) => {
//         const info = document.createElement("p");
//         if (data.results.length > 0) {
//           info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
//         } else {
//           info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
//         }
//         list.prepend(info);
//       },
//       noResults: true,
//       maxResults: 15,
//       tabSelect: true
//     },
//     resultItem: {
//       element: (item, data) => {
//         // Modify Results Item Style
//         item.style = "display: flex; justify-content: space-between;";
//         item.innerHTML = `
//         <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
//           ${data.match}
//         </span>`;
//         // <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
//         //   ${data.key}
//         // </span>;
//       },
//       highlight: true
//     },
//     events: {
//       input: {
//         focus: () => {
//           if (autoCompleteJS.input.value.length) autoCompleteJS.start();
//         }
//       }
//     }
//     });
//     autoCompleteJS.input.addEventListener("selection", function (event) {
//     const feedback = event.detail;
//     autoCompleteJS.input.blur();
//     // Prepare User's Selected Value
//     const selection = feedback.selection.value[feedback.selection.key];
//     // Render selected choice to selection div
//     document.querySelector(".selection").innerHTML = selection;

//     autoCompleteJS.input.value = selection;
//     console.log(feedback);
//     });

//     const action = (action) => {
//     const title = document.querySelector("h1");
//     const selection = document.querySelector(".selection");
//     const footer = document.querySelector(".footer");

//     if (action === "dim") {
//       title.style.opacity = 1;
//       mode.style.opacity = 1;
//       selection.style.opacity = 1;
//     } else {
//       title.style.opacity = 0.3;
//       mode.style.opacity = 0.2;
//       selection.style.opacity = 0.1;
//     }
//     };

//     ["focus", "blur"].forEach((eventType) => {
//     autoCompleteJS.input.addEventListener(eventType, () => {
//       if (eventType === "blur") {
//         action("dim");
//       } else if (eventType === "focus") {
//         action("light");
//       }
//     });
//     });

var options = {
	url: "https://saravanamani1999.github.io/api/moduleInfo.json",

	getValue: "moduleCode",

	list: {
		match: {
			enabled: true
		}
		// onClickEvent: function() {
		// 	alert("click");
		// 	// router.get("/search", (req, res) => {
		// 	// 	res.redirect(`/modules/${req.query.q}`);
		// 	//   });
		// }
	},
	theme: "round"
};

$("#search-bar").easyAutocomplete(options);
  