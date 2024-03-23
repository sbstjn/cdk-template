import { IAspect, TagManager } from 'aws-cdk-lib'
import { IConstruct } from 'constructs'

export interface UnifiedTagsProps {}

export class UnifiedTags implements IAspect {
  constructor(private props?: UnifiedTagsProps) {}

  public visit(node: IConstruct): void {
    if (!TagManager.isTaggable(node)) {
      return
    }

    const tm = TagManager.of(node)!

    tm.setTag('custom:version', node.node.getContext('version'))
    tm.setTag('custom:workload', node.node.getContext('workload'))
  }
}
