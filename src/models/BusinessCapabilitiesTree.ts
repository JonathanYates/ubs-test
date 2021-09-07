import { TreeNode } from "./ApplicationModels";

const createLevel = (level: number, parentSuffix?: string): TreeNode[] => {
    let children: TreeNode[] = [];
    for (let index = 1; index < 4; index++) {
        let suffix = parentSuffix ? `${parentSuffix}.${index}` : index.toString();
        let name = `Business Capability ${suffix}`;
        var subChildren = level < 2 ? createLevel(level+1, suffix) : []
        let node = { name, children: subChildren };
        children.push(node)            
    }
    return children;
}

export const BusinessCapabilitiesTree = ((): TreeNode => {

    let root: TreeNode = { name: 'Business Capabilities', children: [] }
    root.children = createLevel(0); 
    return root; 
})();



