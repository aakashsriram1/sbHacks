import { Input } from "@/components/ui/input"

interface MoneyInputProps {
  amount: number
  onChangeAmount: (amount: number) => void
}

export function MoneyInput({ amount, onChangeAmount }: MoneyInputProps) {
  return (
    <div>
      <label htmlFor="money-input" className="block text-sm font-medium text-gray-700 mb-1">
        Stake amount ($)
      </label>
      <Input
        id="money-input"
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => onChangeAmount(parseFloat(e.target.value))}
        placeholder="Enter amount"
      />
    </div>
  )
}

