export interface ValidationFactory {
  string(opts?: any): any;
  number(opts?: any): any;
  boolean(opts?: any): any;
  any(opts?: any): any;
}
