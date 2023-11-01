export interface TestObject {
  testInt: number;
  testFloat: number;
  testString?: string;
  testChar: string;
}

export type TestUnion = TestObject | string;