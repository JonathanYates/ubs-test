import React, { useCallback, useState } from 'react';
import { useApplicationContext } from '../../context/ApplicationContext';
import { TreeNode } from '../../models/ApplicationModels';
import './TreeView.css';

interface TreeViewProps {
    node: TreeNode;
    isRoot?: boolean;
    isChildElement?: boolean;
    isParentExpanded?: boolean;
}

const TreeView = ({
    node,
    isRoot,
    isChildElement = false,
    isParentExpanded = true,
}: TreeViewProps) => {
    const [isExpanded, setIsExpanded] = useState(isRoot ? true : false);
    const applicationsState = useApplicationContext();

    const businessCapabilitySelected = useCallback(
        (businessCapability: string) => {
            applicationsState?.onSelectedBusinessCapabilityChanged(
                businessCapability
            );
        },
        [applicationsState]
    );

    return (
        <div
            className={`tree-element ${!isParentExpanded && 'collapsed'} ${
                isChildElement && 'is-child'
            }`}
        >
            {node.children && node.children.length > 0 && (
                <span
                    className={`toggler ${isExpanded && 'open'}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                />
            )}
            {node.name ? (
                <span
                    className={`tree-node ${
                        node.name ===
                            applicationsState?.selectedBusinessCapability &&
                        'selected-node'
                    }`}
                    onClick={() =>
                        node.name && businessCapabilitySelected(node.name)
                    }
                >
                    &nbsp;&nbsp;{node.name}
                </span>
            ) : (
                <span>&nbsp;&nbsp;</span>
            )}

            {isExpanded &&
                node.children?.map((node) => (
                    <TreeView
                        key={`${node.name}`}
                        node={node}
                        isChildElement
                        isParentExpanded={isParentExpanded && isExpanded}
                    />
                ))}
        </div>
    );
};

export default TreeView;
