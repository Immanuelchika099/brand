
const token = process.env.FIGMA_TOKEN;
const fileKey = process.env.FIGMA_FILE_KEY;
const nodeId = "233:632";

async function inspectWebsiteDesign() {
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;

  const response = await fetch(url, {
    headers: {
      "X-Figma-Token": token,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status}`);
  }

  const data = await response.json();
  const root = data.nodes?.[nodeId]?.document;

  if (!root) {
    throw new Error("Could not find the requested Figma frame.");
  }

  console.log(`\nDESIGN: ${root.name}`);
  console.log("SIZE:", root.absoluteBoundingBox);

  function inspect(nodes, level = 0) {
    for (const node of nodes ?? []) {
      const indent = "  ".repeat(level);

      if (node.type === "TEXT") {
        console.log(
          `${indent}TEXT: "${node.characters}"`,
          "\n" + indent + "STYLE:",
          JSON.stringify(node.style ?? {})
        );
      } else {
        console.log(
          `${indent}${node.type}: ${node.name}`
        );
      }

      if (node.fills?.length) {
        console.log(
          `${indent}FILLS:`,
          JSON.stringify(node.fills)
        );
      }

      if (node.children) {
        inspect(node.children, level + 1);
      }
    }
  }

  inspect(root.children);
}

inspectWebsiteDesign().catch(console.error);
