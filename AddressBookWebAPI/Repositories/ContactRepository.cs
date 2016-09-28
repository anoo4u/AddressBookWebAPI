using AddressBookWebAPI.Interface;
using AddressBookWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AddressBookWebAPI.Repositories
{
    public class ContactRepository : IContactRepository
    {

        /// <summary>
        /// ORM Database Object from Azure SQL Server  
        /// </summary>
        IIASA_AddressBookEntities ContactsDB = new IIASA_AddressBookEntities();

        public IEnumerable<Contact> GetAll()
        {
            
            return ContactsDB.Contacts;
        }

        public Contact Get(int id)
        {
            // TO DO : Code to find a record in database
            return ContactsDB.Contacts.Find(id);
        }

        public Contact Add(Contact item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            // TO DO : Code to save record into database
            ContactsDB.Contacts.Add(item);
            ContactsDB.SaveChanges();
            return item;
        }

        public bool Update(Contact item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            // TO DO : Code to update record into database
            var objContact = ContactsDB.Contacts.Single(a => a.ContactID == item.ContactID);


            // Mandatory Fields 
            objContact.Name = item.Name;
            objContact.Email = item.Email;

            //Optional Fields
            objContact.PhoneNumber = item.PhoneNumber;
            objContact.JobPosition = item.JobPosition;
            objContact.Institution = item.Institution;

            //Optional Address Fields
            objContact.AddressLine = item.AddressLine;
            




            ContactsDB.SaveChanges();

            return true;
        }

        public bool Delete(int id)
        {
            // TO DO : Code to remove the records from database
            Contact objContact = ContactsDB.Contacts.Find(id);
            ContactsDB.Contacts.Remove(objContact);
            ContactsDB.SaveChanges();
            return true;
        }

    }
}