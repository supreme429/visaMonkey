// if (selectLocation.is(".mat-select-empty")) {
//   let options = $("#mat-select-0-panel mat-option");
//   if (options.length) {
//     options.each(function () {
//       let name = $(this).text().trim();
//       if (name == OPTIONS_TARGET_APPLY_CENTER) {
//         $(this)[0].dispatchEvent(new MouseEvent("click"));
//       }
//     });
//   } else {
//     selectLocation[0].dispatchEvent(new MouseEvent("click"));
//   }

//   setTimeout(checkSchedule, 1000 * SELECT_LOCATION_STEP);
// } else {
//   if (selectType.is(".mat-select-empty")) {
//     let options = $("#mat-select-2-panel mat-option");
//     if (options.length) {
//       options.each(function () {
//         let name = $(this).text().trim();
//         if (name == OPTIONS_TARGET_VISA_TYPE) {
//           $(this)[0].dispatchEvent(new MouseEvent("click"));
//         }
//       });
//     } else {
//       selectType[0].dispatchEvent(new MouseEvent("click"));
//     }

//     setTimeout(checkSchedule, 1000 * APPLY_TYPE_STEP);
//   } else {
//     if (selectVisaType.is(".mat-select-empty")) {
//       let options = $("#mat-select-4-panel mat-option");
//       if (options.length) {
//         let lastCheckIndex: any = GM_getValue("lastCheckIndex");
//         if (typeof lastCheckIndex === "undefined" || lastCheckIndex == null) {
//           lastCheckIndex = -1;
//         }
//         let checkIndex = lastCheckIndex + 1;
//         if (checkIndex >= options.length) {
//           checkIndex = 0;
//         }
//         let checkOption = $(options[checkIndex]);
//         checkOption[0].dispatchEvent(new MouseEvent("click"));
//         GM_setValue("lastCheckIndex", checkIndex);
//       } else {
//         selectVisaType[0].dispatchEvent(new MouseEvent("click"));
//       }
//       setTimeout(checkSchedule, 1000 * VISA_TYPE_STEP);
//     } else {
//       checkResult();
//     }
//   }
// }
