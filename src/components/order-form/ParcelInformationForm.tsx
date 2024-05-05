import { ParcelType } from "../../utilities/enums/ParcelType";
import { ParcelInformationFormProps } from "../../utilities/type-aliases/ParcelInformationFormProps";
import { FormWrapper } from "./FormWrapper";

export function ParcelInformationForm({ length, width, height, weight, updateFields}: ParcelInformationFormProps) {
    return (
        <FormWrapper title="Parcel Information">
            <label className="font-bold">Parcel Type:</label>
            <select name="parcelType">
                <option value={ParcelType.Custom}>Custom</option>
                    <option value={ParcelType.Small}>Small</option>
                    <option value={ParcelType.Medium}>Medium</option>
                    <option value={ParcelType.Large}>Large</option>
            </select>
            <label className="font-bold">Length</label>
            <div>
                <input 
                    autoFocus 
                    required 
                    type="text" 
                    value={length} 
                    onChange={e => updateFields({ length: e.target.value })}
                    className="border-2 px-2 rounded-md bg-gray-200 w-5/6" 
                />
                <span className="px-2 text-gray-500">cm</span>
            </div>
            <label className="font-bold">Width</label>
            <div>
                <input 
                    autoFocus 
                    required 
                    type="text" 
                    value={width} 
                    onChange={e => updateFields({ width: e.target.value })}
                    className="border-2 px-2 rounded-md bg-gray-200 w-5/6" 
                />
                <span className="px-2 text-gray-500">cm</span>
            </div>
            <label className="font-bold">Height</label>
            <div>
                <input 
                    autoFocus 
                    required 
                    type="text" 
                    value={height} 
                    onChange={e => updateFields({ height: e.target.value })}
                    className="border-2 px-2 rounded-md bg-gray-200 w-5/6" 
                />
                <span className="px-2 text-gray-500">cm</span>
            </div>
            <label className="font-bold">Weight</label>
            <div>
                <input 
                    autoFocus 
                    required 
                    type="text" 
                    value={weight} 
                    onChange={e => updateFields({ weight: e.target.value })}
                    className="border-2 px-2 rounded-md bg-gray-200 w-5/6" 
                />
                <span className="px-2 text-gray-500">kg</span>
            </div>
        </FormWrapper>
    )
}