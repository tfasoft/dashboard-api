import ZarinPalCheckout from "zarinpal-checkout";

import { zarinpalConfig } from "$app/config/index.js";

const zarinpal = ZarinPalCheckout.create(zarinpalConfig.merchant, true);

export default zarinpal;
