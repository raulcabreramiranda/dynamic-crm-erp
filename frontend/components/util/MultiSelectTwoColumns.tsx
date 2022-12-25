import React, { useEffect } from 'react';
import MultiSelect from '@kenshooui/react-multi-select';

export const MultiSelectTwoColumns = ({
  id,
  name,
  className,
  data,
  value,
  onChange,
  defaultOptions,
  loadingMessage,
  noOptionsMessage,
  onMenuOpen,
  loadOptions,
  isMulti,
}: any) => {
  useEffect(() => {
    onMenuOpen();
  }, []);
  return (
    <>
      <MultiSelect
        showSearch={true}
        showSelectedItemsSearch={false}
        showSelectAll={true}
        showSelectedItems={true}
        selectionStatusRenderer={(v: any) => {
          return (
            <div className="kn-unselected_status__status___">Selecionados</div>
          );
        }}
        selectAllRenderer={(v: any) => {
          return (
            <div className="kn-unselected_status__status___">Disponíveis</div>
          );
        }}
        itemRenderer={(v: any) => {
          return v.checked ? (
            false
          ) : (
            <div className="kn-item__item___kQ2Ll kn-item__selected___3tRL6">
              <div className="kn-item_label__label___2fJ5p">{v.item.label}</div>
            </div>
          );
        }}
        listRenderer={({
          items,
          width,
          height,
          className,
          rowRenderer,
        }: any) => {
          const Item = rowRenderer;
          return (
            <div
              style={{
                width,
                height: height + 40,
                position: 'absolute',
              }}
              className={className}
            >
              {items.map((item: any, key: any) => (
                <Item style={{ width }} key={key} index={key} />
              ))}
            </div>
          );
        }}
        items={defaultOptions ? defaultOptions : []}
        selectedItems={value ? value : []}
        onChange={onChange}
        messages={{
          searchPlaceholder: 'Buscar',
          noItemsMessage: 'Sem Elementos',
          noneSelectedMessage: 'Nenhum selecionado',
          selectedMessage: 'Selecionados',
          selectAllMessage: 'Selecionar Tudo',
          clearAllMessage: 'Limpar Tudo',
        }}
      />
    </>
  );
};

export default MultiSelectTwoColumns;
