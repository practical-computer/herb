import { AttributeVisitorMixin, isBooleanAttribute, hasAttributeValue } from "./rule-utils.js"

import type { Rule, LintOffense } from "../types.js"
import type { HTMLAttributeNode, Node } from "@herb-tools/core"

class BooleanAttributesNoValueVisitor extends AttributeVisitorMixin {
  protected checkAttribute(attributeName: string, _attributeValue: string | null, attributeNode: HTMLAttributeNode): void {
    if (!isBooleanAttribute(attributeName)) return
    if (!hasAttributeValue(attributeNode)) return

    this.addOffense(
      `Boolean attribute \`${attributeName}\` should not have a value. Use \`${attributeName}\` instead of \`${attributeName}="${attributeName}"\`.`,
      attributeNode.value!.location,
      "error"
    )
  }
}

export class HTMLBooleanAttributesNoValueRule implements Rule {
  name = "html-boolean-attributes-no-value"

  check(node: Node): LintOffense[] {
    const visitor = new BooleanAttributesNoValueVisitor(this.name)
    visitor.visit(node)
    return visitor.offenses
  }
}
