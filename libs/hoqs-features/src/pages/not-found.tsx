import { Header } from "@hoqs/core-components";
import { FormattedMessage } from "react-intl";
import blown from "./not-found.png";

export function NotFound() {
  return (
    <div className="grow justify-center items-center text-center w-100 flex flex-col gap-2">
            <img
        src={blown}
        alt="A blown speaker driver"
        className="object-contain"
      />
      <Header id="notfound.title" />
      <FormattedMessage id="notfound.description1" />
      <br/>
      <FormattedMessage id="notfound.description2" />

    </div>
  );
}

export default NotFound;