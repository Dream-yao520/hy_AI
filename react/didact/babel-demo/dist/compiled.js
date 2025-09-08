/** @jsx Dideact.createElement */

const element = Dideact.createElement("div", {
  id: "foo"
}, Dideact.createElement("a", null, "bar"), Dideact.createElement("b", null));
