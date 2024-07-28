import useHandleOnNewValue from "@/CustomNodes/hooks/use-handle-new-value";
import ShadTooltip from "@/components/shadTooltipComponent";
import useFlowStore from "@/stores/flowStore";
import { isTargetHandleConnected } from "@/utils/reactflowUtils";
import { CustomCellRendererProps } from "ag-grid-react";
import ToggleShadComponent from "../../../toggleShadComponent";

export default function TableAdvancedToggleCellRender({
  value: { nodeId, parameterId },
}: CustomCellRendererProps) {
  const edges = useFlowStore((state) => state.edges);
  const node = useFlowStore((state) => state.getNode(nodeId));
  const parameter = node?.data?.node?.template?.[parameterId];

  const disabled = isTargetHandleConnected(
    edges,
    parameterId,
    parameter,
    nodeId,
  );

  const { handleOnNewValue } = useHandleOnNewValue({
    node: node?.data.node,
    nodeId,
    name: parameterId,
  });

  return (
    parameter && (
      <ShadTooltip
        content={
          disabled
            ? "Cannot change visibility of connected handles"
            : "Change visibility of the field"
        }
        styleClasses="z-50"
      >
        <div>
          <div className="flex h-full items-center">
            <ToggleShadComponent
              id={"show" + parameterId}
              disabled={disabled}
              enabled={!parameter.advanced}
              setEnabled={(e) => {
                handleOnNewValue({ advanced: !e });
              }}
              size="small"
              editNode={true}
            />
          </div>
        </div>
      </ShadTooltip>
    )
  );
}
