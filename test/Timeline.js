import zora from "zora";
import {default as Timeline} from "../src/Timeline.js";

export default zora()
  .test("Timeline", function *(assert) {

    yield cb => new Timeline().render(cb);
    assert.ok(true, "function success");

  });
