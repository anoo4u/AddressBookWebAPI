using AddressBookWebAPI.Interface;
using AddressBookWebAPI.Models;
using AddressBookWebAPI.Repositories;
using System.Collections;
using System.Web.Http;

namespace AddressBookWebAPI.Controllers
{
    public class ContactsController : ApiController
    {

        static readonly IContactRepository repository = new ContactRepository();

        public IEnumerable GetAllContacts()
        {
            return repository.GetAll();
        }

        public Contact PostContact(Contact item)
        {
            return repository.Add(item);
        }

        public IEnumerable PutContact(int id, Contact objContact)
        {
            objContact.ContactID = id;
            if (repository.Update(objContact))
            {
                return repository.GetAll();
            }
            else
            {
                return null;
            }
        }

        public bool DeleteContact(int id)
        {
            if (repository.Delete(id))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
