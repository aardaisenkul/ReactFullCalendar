using System.Collections.Generic;
using ArdaHw3.Models;

namespace ArdaHw3.DataAccess
{
    public interface IDataAccessProvider
    {
        void AddEventRecord(Event ev);
        void UpdateEventRecord(Event ev);
        void DeleteEventRecord(int Id);
        Event GetEventSingleRecord(int Id);
        List<Event> GetEventRecords();

        void AddTypeRecord(Models.Type tp);
        void UpdateTypeRecord(Models.Type tp);
        void DeleteTypeRecord(int Id);
        Type GetTypeSingleRecord(int Id);
        List<Type> GetTypeRecords();
    }
}
