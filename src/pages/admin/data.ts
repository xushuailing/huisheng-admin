interface _MerchantState {
  (): { color: string; label: string; value: number }[];
  (id: number): { color: string; label: string; value: number } | undefined;
}
export const _MerchantState: _MerchantState = (id?: any): any => {
  const state = ['正常', '异常'].map((v, i) => ({
    color: i === 0 ? 'font-success' : 'font-danger',
    label: v,
    value: i,
  }));

  if (id === 0 || id) {
    return state.find((v) => v.value == id);
  }

  return state;
};

export const a = '';
