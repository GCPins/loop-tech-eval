// simple interface to aid in the typing of the test data
// any new fields added to the "loop.data.json" file must 
// also be added here, as well as any modified or removed fields 
export interface LoginTest {
    // name of the desired task
    task: string;
    // which status column the task should be in
    column: string;
    // a list of tags that should be associated with the given task
    tags: readonly string[];
    // the platform for the task card ("Web Application" or "Mobile Application") 
    platform: string;
}
