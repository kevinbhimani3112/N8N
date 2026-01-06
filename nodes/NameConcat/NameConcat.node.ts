import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

export class NameConcat implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Name Concatenator',
        name: 'nameConcat',
        icon: 'file:nameConcat.svg',
        group: ['transform'],
        version: 1,
        description: 'Concatenates first and last name',
        defaults: {
            name: 'Name Concatenator',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'First Name',
                name: 'firstName',
                type: 'string',
                default: '',
                placeholder: 'John',

            },
            {
                displayName: 'Last Name',
                name: 'lastName',
                type: 'string',
                default: '',
                placeholder: 'Doe',

            },
        ],
		usableAsTool: true,
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const firstName = this.getNodeParameter('firstName', i) as string;
            const lastName = this.getNodeParameter('lastName', i) as string;
            const fullName = `${firstName} ${lastName}`;

            returnData.push({
                json: {
                    fullName,
                },
            });
        }

        return [returnData];
    }
}
