export interface TaskTestCase {
  readonly task: string;
  readonly column: string;
  readonly tags: readonly string[];
  readonly platform: string;
}
