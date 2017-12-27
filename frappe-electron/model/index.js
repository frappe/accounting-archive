export const standard_fields = [
	{
		fieldname: 'name', fieldtype: 'Data', reqd: 1
	},
	{
		fieldname: 'owner', fieldtype: 'Link', reqd: 1, options: 'User'
	},
	{
		fieldname: 'modified_by', fieldtype: 'Link', reqd: 1, options: 'User'
	},
	{
		fieldname: 'creation', fieldtype: 'Datetime', reqd: 1
	},
	{
		fieldname: 'modified', fieldtype: 'Datetime', reqd: 1
	},
	{
		fieldname: 'docstatus', fieldtype: 'Integer', reqd: 1, default: 0
	},
];

export const child_fields = [
	{
		fieldname: 'idx', fieldtype: 'Integer', reqd: 1
	},
	{
		fieldname: 'parent', fieldtype: 'Data', reqd: 1
	},
	{
		fieldname: 'parenttype', fieldtype: 'Link', reqd: 1, options: 'DocType'
	},
	{
		fieldname: 'parentfield', fieldtype: 'Data', reqd: 1
	}
];

export const no_value_fields = ['Section Break', 'Column Break', 'HTML',
	'Table', 'Button', 'Image', 'Fold', 'Heading'];
