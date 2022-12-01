import { HttpErrorResponse } from "@angular/common/http";
import { BaseResponse } from "./base-response";

export class ApiErrorResponse extends HttpErrorResponse {
  public override error: BaseResponse<any> | undefined;
}
