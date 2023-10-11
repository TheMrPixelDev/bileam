"use strict";

export class LazyComponent {
  /**
   * @param {string} documentName
   * @param {"div" | "span"} rootType
   */
  constructor(documentName, rootType) {
    if (rootType !== "div" && rootType !== "span") {
      throw new Error("Invalid type for dom node.");
    }
    this.content = document.createElement(rootType);
  }

  /**
   *
   * @param {string} documentName
   */
  load(documentName) {
    const fullLoadString = documentName.endsWith(".html")
      ? documentName
      : documentName + ".html";

    fetch(`/${documentName}`).then((res) => {
      this.content.innerHTML = res;
    });
  }
}

export class Component {
  /**
   * @param {string} innerContent
   * @param {"div" | "span"} rootType
   */
  constructor(innerContent, rootType) {
    if (rootType !== "div" && rootType !== "span") {
      throw new Error("Invalid type of dom node.");
    }
    this.content = document.createElement(rootType);
    this.content.innerHTML = innerContent;
  }
}
