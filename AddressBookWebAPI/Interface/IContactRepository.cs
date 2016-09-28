using AddressBookWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBookWebAPI.Interface
{
    interface IContactRepository
    {
        IEnumerable<Contact> GetAll();
        Contact Get(int id);
        Contact Add(Contact item);
        bool Update(Contact item);
        bool Delete(int id);
    }
}
