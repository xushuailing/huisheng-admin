<template>
  <div class='setting-role-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns-schema="columnsSchema"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>

    <sc-add-form :visible.sync="passForm.visible"
                 :api="passForm.api"
                 @emitAddComplete="passForm.onAddComplete"
                 :config="passForm.formAddConfig">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '../../../lib/@types/sc-param';
import { ScForm } from '../../../lib/@types/sc-form';

const columns: ScTable.SetColumns = [
  ['头像', 'avatarurl', 100, null, 'img'],
  ['名称', 'nickname'],
  ['会员级别', 'level_name'],
  ['创建时间', 'time'],
  ['状态', 'sh_status'],
];

const quota = [
  { value: 4, label: '黄金会员' },
  { value: 5, label: '铂金会员' },
  { value: 6, label: '钻石会员' },
];

@Component
export default class SettingRoleList extends Vue {
  @Ref('table') table!: ScTable;

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [
    { name: 'pass', title: '通过' },
    { name: 'reject', title: '驳回', type: 'danger' },
  ];

  columnsSchema: ScTable.ColumnsSchema = {
    头像: {
      propsHandler: (prop) => ({ ...prop, height: 50, width: 50 }),
    },
    状态: {
      formater: (row, col) => (row[col.prop] == 0 ? '待审核' : '未知'),
    },
  };

  tableConfig = {
    api: this.$api.admin.vip.check,
  };

  searchConfig = {
    data: [
      {
        label: '会员名称：',
        prop: 'nickname',
        tag: {
          attr: {
            placeholder: '请输入会员名称',
          },
        },
      },
      {
        label: '会员类型：',
        prop: 'level_id',
        tag: {
          tagType: 'select',
          options: quota,
          attr: {
            placeholder: '请选择会员类型',
          },
        },
      },
      {
        label: '创建时间：',
        prop: 'time',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '创建时间',
          },
        },
      },
      {
        label: '创建方式：',
        prop: 'none6',
        tag: {
          tagType: 'select',
          options: [],
          attr: {
            placeholder: '请选择创建方式',
          },
        },
      },
    ],
  };

  formAddConfig: ScForm.Config = {
    params: {
      sh_status: 1,
      id: null,
    },
    rules: [
      {
        dl_id: {
          value: [{ required: true, trigger: 'change', message: '请选择代理' }],
        },
      },
    ],
    data: [
      [
        {
          label: '选择代理：',
          prop: 'dl_id',
          tag: {
            tagType: 'select',
            options: [],
            attr: {
              placeholder: '请选择代理',
            },
          },
        },
      ],
    ],
  };

  passForm = {
    visible: false,
    api: this.$api.admin.vip.check.update,
    formAddConfig: this.formAddConfig,
    onAddComplete: this.onAddComplete,
  };

  mounted() {
    this.getPassDl_id();
  }

  onAddComplete({ status }: ScForm.EventComplete) {
    if (status) this.table.emitRefresh();
  }

  getPassDl_id() {
    const api = this.$api.admin.vip.check.agentList;
    this.$http.get<any[]>(api).then(({ data }) => {
      if (data) {
        this.formAddConfig.data[0][0].tag!.options = data.map((v) => ({
          value: v.id,
          label: `${v.nickname} - ${v.phone}`,
        }));
      }
    });
  }

  onSubmit(data: obj) {
    const api = this.$api.admin.vip.check.update;
    this.$http.post(api, { id: data.id, dl_id: data.dl_id, sh_status: data.sh_status }).then(() => {
      this.$message.success('提交成功');

      this.table.emitRefresh();
    });
  }

  async onTableHandlerClick({ row, type }: ScTable.Event.TableHandlerClick) {
    console.log('type', type);

    if (type === 'pass') {
      this.formAddConfig.params!.id = row.id;
      this.passForm.visible = true;
    } else {
      const flag = await this.$utils._MessageConfirm('是否驳回审核', '驳回审核');

      this.onSubmit({ id: row.id, sh_status: 2 });
    }
  }
}
</script>
