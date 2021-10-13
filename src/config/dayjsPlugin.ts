import dayjs from "dayjs";

import objectSupport from "dayjs/plugin/objectSupport";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);
