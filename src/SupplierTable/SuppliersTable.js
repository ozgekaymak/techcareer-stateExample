import React, {useState} from 'react'
import { suppliers } from '../data/suppliers'
import { Button, Table } from 'react-bootstrap';


function SuppliersTable() {

    const [suppliersList, setSuppliersList] = useState(suppliers)
    

    const removeAll = () => {
        setSuppliersList([])

    }
    const orderByDesc = () => {
        let sortSuppliers = suppliersList.sort((a, b) => {
            let fa = a.companyName.toLowerCase(),
                fb = b.companyName.toLowerCase();

            if (fb < fa) {
                return -1;
            }
            if (fb > fa) {
                return 1;
            }
            return 0;
        });
        setSuppliersList([...sortSuppliers])
    }

    const orderBy = () => {
        let sortSuppliers = suppliersList.sort((a, b) => {
            let fa = a.companyName.toLowerCase(),
                fb = b.companyName.toLowerCase();

            if (fb < fa) {
                return 1;
            }
            if (fb > fa) {
                return -1;
            }
            return 0;
        });
        setSuppliersList([...sortSuppliers])
    }

    const loadData = () => {
        setSuppliersList(suppliers);
    }

    const removeItem = (id) => {
        let newSuppliersList = suppliers.filter(q => q.id !== id)
        setSuppliersList(newSuppliersList)
    }


    const searchSuppliers = (data) => {
        let searchData = data.toLowerCase().trim();
        let newSuppliers = suppliers.filter(q => q.companyName.toLowerCase().includes(searchData));
        setSuppliersList(newSuppliers);
    }
    
    
  return ( <>
    <div className="d-flex justify-content-between ">
    <div>
    <input type='text' onChange={(e) => searchSuppliers(e.target.value)} placeholder="Search by name..." />
    <Button variant="outline-info" onClick={e => searchSuppliers()}>Search</Button>
    </div>
    <div>
        <Button variant="outline-success" onClick={() => orderBy()}>Order By</Button>
        <Button variant="outline-success" onClick={() => orderByDesc()}>Order By Desc</Button>
    </div>
    </div>
     
   
    <Table striped bordered hover size="md">
    <thead>
      <tr>
        <th>Id</th>
        <th>Company Name</th>
        <th>Contact Name</th>
        <th>Contact Title</th>
        <th>Country</th>
        <th>Phone</th>
      </tr>
    </thead>
            {
                suppliersList && suppliersList.map((item,key) => {
                    return <tbody>
                    <tr key = {item.id}>
                      <th> {item.id} </th>
                      <td> {item.companyName} </td>
                      <td> {item.contactName} </td>
                      <td> {item.contactTitle} </td>
                      <td> {item.address.city}</td>
                      <td> {item.address.phone} </td>
                      <td> <Button variant="outline-primary" onClick={() => removeItem(item.id)}>Remove</Button></td>
                    </tr>
                  </tbody>
                })
            }
        
        </Table>

        <div>
            
        <Button variant="outline-danger" onClick={() => removeAll()}>Remove All</Button>
        <Button variant="outline-success" onClick={() => loadData()}>Load Data</Button>
        </div>
    
    </>
  )
}

export default SuppliersTable