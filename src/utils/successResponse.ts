export class SuccessResponse {
  constructor(
    public data: any = null,
    public code: number = 200,
    public message: string = ""
  ) {}
}
