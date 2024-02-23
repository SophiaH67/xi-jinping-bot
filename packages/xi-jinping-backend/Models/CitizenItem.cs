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

    private ulong? _citizenId;

    [Column("citizenID")]
    // Make getter return a float -> ulong version of DiscordId if CitizenId is null
    public ulong CitizenId { get => _citizenId ?? ulong.Parse(DiscordId); set => _citizenId = value; }
    [Column("discordID")]
    public string DiscordId { get; set; }
    [Column("socialCreditScore")]
    public int SocialCreditScore { get; set; }
    [Column("guilds")]
    public List<string> Guilds { get; set; } = [];

    [Column("username")]
    public string Username { get; set; } = "unknown";

    public Task AddGuild(string guildId, CitizenContext context)
    {
        if (Guilds.Contains(guildId)) return Task.CompletedTask;

        Guilds.Add(guildId);
        return context.SaveChangesAsync();
    }
}