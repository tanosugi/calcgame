import graphene  # type:ignore
import graphql_jwt  # , import, login_required
from django.contrib.auth.models import User
from graphene import relay  # type:ignore
from graphene_django import DjangoObjectType  # type:ignore
from graphene_django.filter import DjangoFilterConnectionField
from graphql_jwt.decorators import login_required
from graphql_relay import from_global_id  # type:ignore

from .models import Game, Profile


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = {
            "username": ["exact", "icontains"],
        }
        interfaces = (relay.Node,)


class ProfileNode(DjangoObjectType):
    class Meta:
        model = Profile
        filter_fields = {
            "user_prof__username": ["icontains"],
        }
        interfaces = (relay.Node,)


class GameNode(DjangoObjectType):
    class Meta:
        model = Game
        filter_fields = {
            "user_prof__username": ["icontains"],
        }
        interfaces = (relay.Node,)


class CreateUserMutation(relay.ClientIDMutation):
    class Input:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        # email = graphene.String(required=True)

    user = graphene.Field(UserNode)

    def mutate_and_get_payload(root, info, **input):
        user = User(
            username=input.get("username"),
            # email=input.get("email"),
        )
        user.set_password(input.get("password"))  # type: ignore
        user.save()
        profile = Profile(
            user_prof_id=user.pk,
        )
        profile.save()
        return CreateUserMutation(user=user)


# class ProfileCreateMutation(relay.ClientIDMutation):
#     profile = graphene.Field(ProfileNode)

#     @login_required
#     def mutate_and_get_payload(root, info, **input):
#         profile = Profile(
#             user_prof_id=info.context.user.id,
#         )
#         profile.save()
#         return ProfileCreateMutation(profile=profile)


class UpdateProfileMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    profile = graphene.Field(ProfileNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        profile = Profile.objects.get(id=from_global_id(input.get("id"))[1])
        profile.save()

        return UpdateProfileMutation(profile=profile)


class CreateGameMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    game = graphene.Field(GameNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        game = Game()
        game.save()
        # profile = Profile.objects.get(user_prof=info.context.user.id)
        # profile.game_playing = game

        return CreateGameMutation(game=game)


class Mutation(graphene.AbstractType):
    create_user = CreateUserMutation.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    # create_profile = ProfileCreateMutation.Field()
    update_profile = UpdateProfileMutation.Field()
    create_game = CreateGameMutation.Field()


class Query(graphene.ObjectType):
    me = graphene.Field(UserNode)
    profile = graphene.Field(ProfileNode)
    all_users = DjangoFilterConnectionField(UserNode)
    all_profiles = DjangoFilterConnectionField(ProfileNode)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in!")
        return user

    @login_required
    def resolve_profile(self, info, **kwargs):
        return Profile.objects.get(user_prof=info.context.user.id)

    @login_required
    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

    @login_required
    def resolve_all_profiles(self, info, **kwargs):
        return Profile.objects.all()
