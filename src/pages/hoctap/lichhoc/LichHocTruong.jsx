import React from 'react';
import './LichHocTruong.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { dataLich } from '../../../dummyData';

const data = dataLich;

class LichHocTruong extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const columns = [
            {
                title: 'STT',
                key: 'stt',
                dataIndex: 'key',
                width: 90,
            },
            {
                title: 'M?? h???c ph???n',
                dataIndex: 'mhp',
                key: 'mhp',
                width: 150,
                ...this.getColumnSearchProps('mhp'),
            },
            {
                title: 'T??n m??n h???c',
                dataIndex: 'name',
                key: 'name',
                width: 150,
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'L???p h???c',
                key: 'lop',
                dataIndex: 'lop',
                width: 100,
                ...this.getColumnSearchProps('lop'),
            },
            {
                title: 'Khoa',
                key: 'khoa',
                dataIndex: 'khoa',
                width: 100,
            },
            {
                title: 'Th???',
                key: 'thu',
                dataIndex: 'thu',
                width: 100,
            },
            {
                title: 'Ti???t h???c',
                key: 'tiethoc',
                dataIndex: 'tiethoc',
                width: 100,
            },
            {
                title: 'Th???i gian h???c',
                key: 'time',
                dataIndex: 'time',
                width: 150,
            },
            {
                title: 'T??n ph??ng',
                key: 'phong',
                dataIndex: 'phong',
                width: 100,
            },
            {
                title: 'Gi???ng vi??n',
                key: 'giaovien',
                dataIndex: 'giaovien',
                width: 200,
            }
        ];
        return <div className='lichhoctruong'>
            <Table columns={columns} dataSource={data} />
        </div>;
    }
}

export default LichHocTruong;