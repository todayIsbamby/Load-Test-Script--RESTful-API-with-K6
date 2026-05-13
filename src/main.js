import { options as loadOptions } from "./config/options.js";
import { postProductsScenario } from "./scenarios/postProducts.js";

export const options = loadOptions;

export default function () {
  postProductsScenario();
}