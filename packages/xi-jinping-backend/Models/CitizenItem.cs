using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace xi_jinping_backend.Models;

public class CitizenItem
{
    [BsonElement("_id")]
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore]
    public ObjectId _id { get; set; }
    [Column("citizenID")]
    public ulong CitizenId { get; set; }
    [Column("discordID")]
    public string DiscordId { get; set; }
    [Column("socialCreditScore")]
    public int SocialCreditScore { get; set; }
}