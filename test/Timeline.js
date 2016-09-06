import {test} from "tape";
import {default as Timeline} from "../src/Timeline.js";

test("Timeline", assert => {

  new Timeline()
    .render(() => {

      assert.true(true, "function success");
      assert.end();

    });

});
