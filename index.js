
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1500)
  .attr("height", 2000);

const flamPink = "#f2617a";
const waveBlue = "#003d4f";
const dkGrey = "#666666";
const tumYellow = "#cc850a";
const sapBlue = "#47a1ad";

const textColor = "#ffffff";

const fromBox = { x: 0, width: 500, height: 60, color: flamPink };
const toBox = { x: 800, width: 300, height: 80, color: waveBlue };
const arrow = { x1: 500, x2: 800, color: dkGrey };

const fromYOffset = 80;
const toYOffset = 120;

const fromBoxTitles = [
  { title: "1. Trunk-Based Development", toBoxIndexes: [0, 1] },
  { title: "2. Test Driven Development (TDD)", toBoxIndexes: [1, 3] },
  { title: "3. Pair Development", toBoxIndexes: [1, 3] },
  { title: "4. Build Security In", toBoxIndexes: [1, 3] },
  { title: "5. Fast Automated Build", toBoxIndexes: [0, 2, 3] },
  { title: "6. Automated Deployment Pipeline", toBoxIndexes: [0, 2] },
  { title: "7. Early and Continuous Deployment", toBoxIndexes: [0, 2] },
  { title: "8. Quality and Debt effectively managed", toBoxIndexes: [1, 3] },
  { title: "9. Build for Production", toBoxIndexes: [0, 2] }
];

const toBoxTitles = [
  "↑ Deployment Frequency",
  "↓ MTTR",
  "↓ Lead Time For Changes",
  "↓ Change Failure Rate"
];

const createFromBoxes = (titles, allToBoxes) => {
  const boxes = [];
  titles.forEach((titleObj, i) => {
    const toBoxes = [];
    titleObj.toBoxIndexes.forEach((boxI, i) => toBoxes[i] = allToBoxes[boxI]);
    boxes[i] = createFromBox(titleObj.title, fromYOffset * i, toBoxes);
  });
  return boxes;
};

const createFromBox = (txt, y, toBoxes) => {

  return {
    text: txt,
    y: y,
    ...fromBox,
    arrows: createArrows(y + fromBox.height / 2, toBoxes),
    toBoxes: toBoxes,
  };
};

const createArrows = (from, toBoxes) => {
  const arrows = [];
  toBoxes.forEach(
    (to, i) => arrows[i] = { y1: from, y2: (to.y + (toBox.height / 2)), ...arrow }
  );
  return arrows;
};

const createToBox = (txt, y) => {
  return {
    text: txt,
    y: y,
    ...toBox
  };
};

const createToBoxes = (titles) => {
  const boxes = [];
  titles.forEach(
    (title, i) => (boxes[i] = createToBox(title, (i + 1) * toYOffset))
  );
  return boxes;
};

const drawToBox = (box) => {
  svg
    .append("rect")
    .attr("x", box.x)
    .attr("y", box.y)
    .attr("width", box.width)
    .attr("height", box.height)
    .attr("fill", box.color);

  svg
    .append("text")
    .attr("x", box.x + (box.width/2) - 5)
    .attr("y", box.y + (box.height/2) + 5)
    .attr("font-size", 22)
    .attr("font-family", "Inter")
    .attr("font-weight", 600)
    .style("text-anchor", "middle")
    .attr("fill", textColor)
    .text(box.text);
};

const drawHighlightedToBox = (box) => {
  svg
    .append("rect")
    .attr("x", box.x)
    .attr("y", box.y)
    .attr("width", box.width)
    .attr("height", box.height)
    .attr("fill", sapBlue);

  svg
    .append("text")
    .attr("x", box.x + (box.width/2) - 5)
    .attr("y", box.y + (box.height/2) + 5)
    .attr("font-size", 22)
    .attr("font-family", "Inter")
    .attr("font-weight", 600)
    .style("text-anchor", "middle")
    .attr("fill", textColor)
    .text(box.text);
};

const drawFromBox = (box) => {
  svg
    .append("rect")
    .attr("x", box.x)
    .attr("y", box.y)
    .attr("width", box.width)
    .attr("height", box.height)
    .attr("fill", box.color)
    .attr("text", "hi")
    .on("mouseenter", () => {
      box.arrows.forEach((arrow) => drawHighlightedArrow(arrow));
      box.toBoxes.forEach((toBox) => drawHighlightedToBox(toBox));
    })
    .on("mouseleave", () => {
      box.arrows.forEach((arrow) => drawRegularArrow(arrow));
      box.toBoxes.forEach((toBox) => drawToBox(toBox));
    });


  svg
    .append("text")
    .attr("x", box.x)
    .attr("y", box.y)
    .attr("dy", "2em")
    .attr("dx", "2em")
    .attr("font-size", 18)
    .attr("font-family", "Inter")
    .attr("font-weight", 500)
    .attr("fill", textColor)
    .text(box.text);

  box.arrows.forEach((arrow) => drawRegularArrow(arrow));
};

const drawArrow = (a, color) => {
  svg
    .append("line")
    .attr("x1", a.x1)
    .attr("y1", a.y1)
    .attr("x2", a.x2)
    .attr("y2", a.y2)
    .attr("stroke", color)
    .attr("stroke-width", 2);
};

const drawHighlightedArrow = (a) => {
  drawArrow(a, tumYellow);
};

const drawRegularArrow = (a) => {
  drawArrow(a, dkGrey);
};

const drawFromBoxes = (boxes) => {
  boxes.forEach((box) => drawFromBox(box));
};

const drawToBoxes = (boxes) => {
  boxes.forEach((box) => drawToBox(box));
};

const toBoxes = createToBoxes(toBoxTitles);
const fromBoxes = createFromBoxes(fromBoxTitles, toBoxes);

drawFromBoxes(fromBoxes);
drawToBoxes(toBoxes);
