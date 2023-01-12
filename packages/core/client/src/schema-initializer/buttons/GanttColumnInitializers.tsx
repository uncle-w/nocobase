import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer } from '../SchemaInitializer';
import {
  itemsMerge,
  useAssociatedTableColumnInitializerFields,
  useTableColumnInitializerFields,
  useInheritsTableColumnInitializerFields,
} from '../utils';
import { useCompile } from '../../schema-component';

// 甘特图表格列配置
export const GanttColumnInitializers = (props: any) => {
  const { items = [] } = props;
  const { t } = useTranslation();
  const associatedFields = useAssociatedTableColumnInitializerFields();
  const inheritFields = useInheritsTableColumnInitializerFields();
  const compile = useCompile();
  const fieldItems: any[] = [
    {
      type: 'itemGroup',
      title: t('Display fields'),
      children: useTableColumnInitializerFields(),
    },
  ];
  if (inheritFields?.length > 0) {
    inheritFields.forEach((inherit) => {
      Object.values(inherit)[0].length &&
        fieldItems.push(
          {
            type: 'divider',
          },
          {
            type: 'itemGroup',
            title: t(`Parent collection fields`) + '(' + compile(`${Object.keys(inherit)[0]}`) + ')',
            children: Object.values(inherit)[0],
          },
        );
    });
  }
  if (associatedFields?.length > 0) {
    fieldItems.push(
      {
        type: 'divider',
      },
      {
        type: 'itemGroup',
        title: t('Display association fields'),
        children: associatedFields,
      },
    );
  }
  fieldItems.push(
    {
      type: 'divider',
    },
    {
      type: 'item',
      title: t('Action column'),
      component: 'TableActionColumnInitializer',
    },
  );
  console.log(5)
  return (
    <SchemaInitializer.Button
      insertPosition={'beforeEnd'}
      icon={'SettingOutlined'}
      wrap={(s) => {
        console.log(s)
        if (s['x-action-column']) {
          return s;
        }
        return {
          type: 'void',
          'x-decorator': 'TableV2.Column.Decorator',
          'x-designer': 'TableV2.Column.Designer',
          'x-component': 'TableV2.Column',
          properties: {
            [s.name]: {
              ...s,
            },
          },
        };
      }}
      items={itemsMerge(fieldItems, items)}
    >
      {t('Configure columns')}
    </SchemaInitializer.Button>
  );
};
