import A from "./A.mjs";
import lodash from "../node_modules/lodash/lodash";
console.log(lodash);

document.getElementById("root").innerText = "loading dynamic part";

// dynamic import
import("./dynamic.mjs").then((imp) => {
    document.getElementById("root").innerText = "dynamic part loaded";
    console.log({ ...imp });
});
