using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace xi_jinping_backend.Models;

public class CitizenItem
{
    [BsonElement("_id")]
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId _id { get; set; }
    [Column("citizenID")]
    public ulong CitizenId { get; set; }
    [Column("discordID")]
    public string DiscordId { get; set; }
    [Column("socialCreditScore")]
    public int SocialCreditScore { get; set; }
}